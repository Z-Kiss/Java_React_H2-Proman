package com.zkiss.proman.repository;

import com.zkiss.proman.model.Card;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CardRepository extends JpaRepository<Card, Long> {

   Integer deleteCardById(Long id);

}
