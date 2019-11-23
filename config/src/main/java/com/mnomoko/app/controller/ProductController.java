package com.mnomoko.app.controller;

import com.mnomoko.app.model.Product;
import com.mnomoko.app.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;
import java.util.Optional;

@RequestMapping(value = "/api/products")
@Controller
public class ProductController {

  @Autowired
  private ProductService productService;

  @GetMapping(produces = {"application/json"})
  public ResponseEntity<?> getCompanies(Pageable pageable, PagedResourcesAssembler assembler) {
    Page<Product> products = productService.getAllProducts(pageable);

    return ResponseEntity.ok(assembler.toResource(products));
  }

  @GetMapping(value = "/{idProduct}")
  public ResponseEntity<?> getProduct(@NotNull @PathVariable("idProduct") Long id) {
    Optional<Product> product = productService.getProduct(id);

    return ResponseEntity.ok(product);
  }

  @PostMapping(value = "/", consumes = {"application/json"})
  public ResponseEntity<?> postProduct(@NotNull @RequestBody Product product) {
    Product persistedProduct = productService.persist(product);

    return ResponseEntity.ok(persistedProduct);
  }

  @PutMapping(value = "/{idProduct}", consumes = {"application/json"})
  public ResponseEntity<?> putProduct(@NotNull @PathVariable("idProduct") Long id, @NotNull @RequestBody Product product) {
    Product persistedProduct = productService.persist(product);

    return ResponseEntity.ok(persistedProduct);
  }
}
