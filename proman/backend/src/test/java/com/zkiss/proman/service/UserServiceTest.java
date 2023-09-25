package com.zkiss.proman.service;

import com.zkiss.proman.auth.AuthenticationResponse;
import com.zkiss.proman.auth.JwtService;
import com.zkiss.proman.model.AppUser;
import com.zkiss.proman.model.DTO.userDTO.UserLoginRequest;
import com.zkiss.proman.model.DTO.userDTO.UserRegisterRequest;
import com.zkiss.proman.model.RoleType;
import com.zkiss.proman.repository.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;
import java.util.UUID;

import static org.mockito.Mockito.*;


@ExtendWith(MockitoExtension.class)
public class UserServiceTest {
    @Spy
    private UserRepository userRepository;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private AuthenticationManager authenticationManager;
    @Mock
    private JwtService jwtService;
    @InjectMocks
    private UserService userService;

    private final AppUser appUserTest = AppUser.builder()
            .id(UUID.randomUUID())
            .email("test@test.com")
            .password("test")
            .name("test")
            .role(RoleType.USER)
            .build();


    @Test
    void test_registerUser_method_working() {
        UserRegisterRequest request = UserRegisterRequest.builder()
                .email("test@test.com")
                .name("test")
                .password("test")
                .role(RoleType.USER)
                .build();

        Assertions.assertDoesNotThrow(() -> this.userService.registerUser(request));
        verify(userRepository,times(1)).save(any());
    }

    @Test
    void test_loginUser_method_working() {
        when(userRepository.getAppUserByEmail(any())).thenReturn(Optional.of(appUserTest));

        UserLoginRequest userLoginRequest = UserLoginRequest.builder()
                .email("test@test.com")
                .password("test")
                .build();

        AuthenticationResponse authenticationResponse = this.userService.loginUser(userLoginRequest);


        verify(userRepository,times(1)).getAppUserByEmail(any());
        verify(authenticationManager,times(1)).authenticate(any());
        verify(jwtService,times(1)).generateToken(any());
        Assertions.assertNotNull(authenticationResponse);
    }

    @Test
    void test_getAppUserById_method_working() {
        when(userRepository.getAppUserById(any(UUID.class))).thenReturn(appUserTest);

        AppUser appUserFromService = userService.getAppUserById(appUserTest.getId());

        verify(userRepository,times(1)).getAppUserById(any(UUID.class));
        Assertions.assertNotNull(appUserFromService);
        Assertions.assertEquals(appUserFromService.getName(), appUserTest.getName());
    }

    @Test
    void test_getAppUserByEmail_method_working() {
        when(userRepository.getAppUserByEmail(any())).thenReturn(Optional.of(appUserTest));

        AppUser appUserFromService = userService.getAppUserByEmail(appUserTest.getEmail());

        verify(userRepository,times(1)).getAppUserByEmail(any());
        Assertions.assertNotNull(appUserFromService);
        Assertions.assertEquals(appUserFromService.getId(), appUserTest.getId());
    }
}
