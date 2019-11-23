package com.mnomoko.app.controller;

import com.mnomoko.app.model.Category;
import com.mnomoko.app.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;
import java.util.Optional;

@RequestMapping(value = "/api/categories")
@Controller
public class CategoryController {

  @Autowired
  private CategoryService categoryService;

  @GetMapping(produces = {"application/json"})
  public ResponseEntity<?> getCompanies(Pageable pageable, PagedResourcesAssembler assembler) {
    Page<Category> categories = categoryService.getAllCategories(pageable);

    return ResponseEntity.ok(assembler.toResource(categories));
  }

  @GetMapping(value = "/{idCompany}")
  public ResponseEntity<?> getCompany(@NotNull @PathVariable("idCompany") Long id) {
    Optional<Category> category = categoryService.getCategory(id);

    return ResponseEntity.ok(category);
  }

  @PostMapping(value = "/", consumes = {"application/json"})
  public ResponseEntity<?> postCompany(@NotNull Category category) {
    Category persistedCategory = categoryService.persist(category);

    return ResponseEntity.ok(persistedCategory);
  }

  @PutMapping(value = "/{idCompany}", consumes = {"application/json"})
  public ResponseEntity<?> putCompany(@NotNull @PathVariable("idCompany") Long id, @NotNull Category category) {
    Category persistedCategory = categoryService.persist(category);

    return ResponseEntity.ok(persistedCategory);
  }
}
