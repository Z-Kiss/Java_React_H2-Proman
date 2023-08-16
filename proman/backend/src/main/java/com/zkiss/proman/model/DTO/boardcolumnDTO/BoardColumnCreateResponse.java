package com.zkiss.proman.model.DTO.boardcolumnDTO;

import com.zkiss.proman.model.BoardColumn;
import lombok.AllArgsConstructor;
import lombok.Data;



@Data
@AllArgsConstructor
public class BoardColumnCreateResponse {

    private Long boardId;

    private BoardColumn boardColumn;
}
