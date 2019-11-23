package com.mnomoko.app.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Category implements Serializable {

  @Id @GeneratedValue(strategy= GenerationType.IDENTITY)
  private Long id;

  private String name;

  @JsonIgnore
  @OneToMany(mappedBy = "category")
  private List<Product> products;
}
