package com.zkiss.proman.repository;

import com.zkiss.proman.model.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {

    List<Board> getBoardsByAppUser_Id(UUID id);

    Board getBoardById(Long id);

    void deleteById(Long id);
}
