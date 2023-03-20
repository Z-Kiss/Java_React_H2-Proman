package com.zkiss.proman.modal.DTO;

import java.util.Arrays;
import java.util.Objects;
import java.util.stream.Stream;

public interface Validator {

    default boolean hasNoNullField(){
        return Stream.of(this.getClass().getDeclaredFields()).anyMatch(Objects::nonNull);
    }
}
