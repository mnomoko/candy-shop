package com.mnomoko.app.service;

import com.mnomoko.app.model.Category;
import com.mnomoko.app.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CategoryService {

  @Autowired
  private CategoryRepository categoryRepository;

  public Page<Category> getAllCategories(Pageable pageable) {
    return categoryRepository.findAll(pageable);
  }

  public Optional<Category> getCategory(Long id) {
    return categoryRepository.findById(id);
  }

  public Category persist(Category category) {
    return categoryRepository.save(category);
  }
}
