package com.zkiss.proman.repository;


import com.zkiss.proman.model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<AppUser, Long>{

    boolean existsByName(String name);

    boolean existsByEmail(String email);

    boolean existsByEmailOrName(String name, String email);

    boolean existsByEmailAndPassword(String email, String password);

    AppUser getAppUserByEmail(String email);

    AppUser getAppUserById(Long userId);
}