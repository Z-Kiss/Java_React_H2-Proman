package com.zkiss.proman.model.DTO;

import java.util.Objects;
import java.util.stream.Stream;

public interface Validator {

    default boolean hasNoNullField(){
        return Stream.of(this.getClass().getDeclaredFields()).anyMatch(Objects::nonNull);
    }
}
