package com.zkiss.proman.repository;

import com.zkiss.proman.modal.AppUser;
import com.zkiss.proman.modal.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {

    List<Board> getBoardsByAppUser_Id(Long id);

    Board getBoardById(Long id);
}
