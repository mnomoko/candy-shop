package com.mnomoko.app.controller;

import com.mnomoko.app.model.Commande;
import com.mnomoko.app.service.CommandeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;
import java.util.Optional;

@RequestMapping(value = "/api/commandes")
@Controller
public class CommandeController {

  @Autowired
  private CommandeService commandeService;

  @GetMapping(produces = {"application/json"})
  public ResponseEntity<?> getCompanies(Pageable pageable, PagedResourcesAssembler assembler) {
    Page<Commande> commandes = commandeService.getAllCommandes(pageable);

    return ResponseEntity.ok(assembler.toResource(commandes));
  }

  @GetMapping(value = "/{idCompany}")
  public ResponseEntity<?> getCompany(@NotNull @PathVariable("idCompany") Long id) {
    Optional<Commande> commande = commandeService.getCommande(id);

    return ResponseEntity.ok(commande);
  }

  @PostMapping(value = "/")
  public ResponseEntity<?> postCompany(@NotNull Commande commande) {
    Commande persistedCommande = commandeService.persist(commande);

    return ResponseEntity.ok(persistedCommande);
  }

  @PutMapping(value = "/{idCompany}")
  public ResponseEntity<?> putCompany(@NotNull @PathVariable("idCompany") Long id, @NotNull Commande commande) {
    Commande persistedCommande = commandeService.persist(commande);

    return ResponseEntity.ok(persistedCommande);
  }
}
