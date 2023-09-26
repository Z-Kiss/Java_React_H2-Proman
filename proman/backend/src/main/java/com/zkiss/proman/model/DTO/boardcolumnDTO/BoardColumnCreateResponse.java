package com.zkiss.proman.model.DTO.boardcolumnDTO;

import com.zkiss.proman.model.BoardColumn;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;


@Data
@AllArgsConstructor
@Builder
public class BoardColumnCreateResponse {

    private Long boardId;

    private BoardColumn boardColumn;
}
