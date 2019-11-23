package com.mnomoko.app.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Customer implements Serializable {

  @Id @GeneratedValue(strategy= GenerationType.IDENTITY)
  private Long id;

  private String lastname;
  private String firstname;
  private String login;
  private String password;

  @JsonIgnore
  @OneToMany(mappedBy = "customer")
  private List<Commande> commandes;
}
