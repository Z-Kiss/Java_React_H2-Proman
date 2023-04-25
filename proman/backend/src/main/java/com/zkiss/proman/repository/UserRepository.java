package com.zkiss.proman.repository;


import com.zkiss.proman.model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<AppUser, UUID>{

    boolean existsByName(String name);

    boolean existsByEmail(String email);

    boolean existsByEmailOrName(String name, String email);

    Optional<AppUser> getAppUserByEmail(String email);

    AppUser getAppUserById(UUID userId);

}