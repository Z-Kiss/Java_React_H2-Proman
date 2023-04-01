package com.zkiss.proman.repository;

import com.zkiss.proman.model.BoardColumn;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardColumnRepository extends JpaRepository<BoardColumn, Long> {
    BoardColumn getBoardColumnById(Long id);
}
