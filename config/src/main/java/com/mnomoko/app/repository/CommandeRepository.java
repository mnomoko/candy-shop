package com.mnomoko.app.repository;

import com.mnomoko.app.model.Commande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional
public interface CommandeRepository extends JpaRepository<Commande, Long> {
}
