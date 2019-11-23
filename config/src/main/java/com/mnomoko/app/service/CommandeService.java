package com.mnomoko.app.service;

import com.mnomoko.app.model.Commande;
import com.mnomoko.app.repository.CommandeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CommandeService {

  @Autowired
  private CommandeRepository commandeRepository;

  public Page<Commande> getAllCommandes(Pageable pageable) {
    return commandeRepository.findAll(pageable);
  }

  public Optional<Commande> getCommande(Long id) {
    return commandeRepository.findById(id);
  }

  public Commande persist(Commande commande) {
    return commandeRepository.save(commande);
  }
}
