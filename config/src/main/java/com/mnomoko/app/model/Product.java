package com.mnomoko.app.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Product implements Serializable {

  @Id @GeneratedValue(strategy= GenerationType.IDENTITY)
  private Long id;

  private String name;
  private Double price;

  @ManyToOne
  @JoinColumn(name = "category_id")
  private Category category;
}
