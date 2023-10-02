package com.zkiss.proman.utils;

import com.zkiss.proman.model.AppUser;
import com.zkiss.proman.model.DTO.boardDTO.BoardCreateRequest;
import com.zkiss.proman.model.DTO.boardcolumnDTO.BoardColumnCreateRequest;
import com.zkiss.proman.model.DTO.cardDTO.CardCreateRequest;
import com.zkiss.proman.model.DTO.userDTO.UserLoginRequest;
import com.zkiss.proman.model.DTO.userDTO.UserRegisterRequest;
import com.zkiss.proman.model.RoleType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@AllArgsConstructor
@Getter
public class TestObjectSupplier {

    private final String TEST_EMAIL = "test@test.com";
    private final String TEST_GUEST_EMAIL = "guest@guest.com";
    private final String TEST_PASSWORD = "testPassword";
    private final String TEST_GUEST_PASSWORD = "guestguest";
    private final String TEST_NAME = "testName";
    private final String TEST_GUEST_NAME = "Guest";
    private final String TEST_TITLE = "testTitle";
    private final String TEST_TEXT_COLOR = "testTextColor";
    private final String TEST_BG_COLOR = "testBgColor";
    private final RoleType TEST_ROLE = RoleType.USER;

    private final UserRegisterRequest registerRequest = UserRegisterRequest.builder()
            .email(TEST_EMAIL)
            .password(TEST_PASSWORD)
            .name(TEST_NAME)
            .role(TEST_ROLE)
            .build();

    private final UserLoginRequest loginRequest = UserLoginRequest.builder()
            .email(TEST_EMAIL)
            .password(TEST_PASSWORD)
            .build();

    private final AppUser appUserTest = AppUser.builder()
            .id(UUID.randomUUID())
            .email(TEST_EMAIL)
            .password(TEST_PASSWORD)
            .name(TEST_NAME)
            .role(RoleType.USER)
            .build();

    private final UserLoginRequest guestLoginRequest = UserLoginRequest.builder()
            .email(TEST_GUEST_EMAIL)
            .password(TEST_GUEST_PASSWORD)
            .build();

    private final AppUser guestAppUserTest = AppUser.builder()
            .id(UUID.randomUUID())
            .email(TEST_GUEST_EMAIL)
            .name(TEST_GUEST_NAME)
            .password(TEST_GUEST_PASSWORD)
            .role(RoleType.GUEST)
            .build();

    private final BoardCreateRequest boardCreateRequest = BoardCreateRequest.builder()
            .title(TEST_TITLE)
            .textColor(TEST_TEXT_COLOR)
            .bgColor(TEST_BG_COLOR)
            .build();

    private final BoardColumnCreateRequest boardColumnCreateRequest = BoardColumnCreateRequest.builder()

            .textColor(TEST_TEXT_COLOR)
            .bgColor(TEST_BG_COLOR)
            .title(TEST_TITLE)
            .build();

    private final CardCreateRequest cardCreateRequest = CardCreateRequest.builder()
            .title(TEST_TITLE)
            .textColor(TEST_TEXT_COLOR)
            .bgColor(TEST_BG_COLOR)
            .build();
}
