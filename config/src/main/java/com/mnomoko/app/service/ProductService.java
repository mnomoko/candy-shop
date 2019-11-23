package com.mnomoko.app.service;

import com.mnomoko.app.model.Product;
import com.mnomoko.app.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProductService {

  @Autowired
  private ProductRepository productRepository;

  public Page<Product> getAllProducts(Pageable pageable) {
    return productRepository.findAll(pageable);
  }

  public Optional<Product> getProduct(Long id) {
    return productRepository.findById(id);
  }

  public Product persist(Product product) {
    return productRepository.save(product);
  }
}
