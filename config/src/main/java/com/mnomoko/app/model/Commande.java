package com.mnomoko.app.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Commande implements Serializable {

  @Id @GeneratedValue(strategy= GenerationType.IDENTITY)
  private Long id;

  private Date purchaseDate;

  @ManyToOne
  @JoinColumn(name = "customer_id")
  private Customer customer;
}
