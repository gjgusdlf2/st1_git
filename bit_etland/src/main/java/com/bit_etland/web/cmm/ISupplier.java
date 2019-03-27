package com.bit_etland.web.cmm;

import org.springframework.stereotype.Service;

@FunctionalInterface
@Service
public interface ISupplier {
	public abstract Object get();
}
