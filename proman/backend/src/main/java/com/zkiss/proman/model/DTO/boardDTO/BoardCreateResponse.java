package com.zkiss.proman.model.DTO.boardDTO;

import com.zkiss.proman.model.Board;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BoardCreateResponse {

    private Board board;
}
