package com.mnomoko.app.controller;

import com.mnomoko.app.model.Customer;
import com.mnomoko.app.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;
import java.util.Optional;

@RequestMapping(value = "/api/customers")
@Controller
public class CustomerController {

  @Autowired
  private CustomerService customerService;

  @GetMapping(produces = {"application/json"})
  public ResponseEntity<?> getCompanies(Pageable pageable, PagedResourcesAssembler assembler) {
    Page<Customer> customers = customerService.getAllCustomers(pageable);

    return ResponseEntity.ok(assembler.toResource(customers));
  }

  @GetMapping(value = "/{idCompany}")
  public ResponseEntity<?> getCompany(@NotNull @PathVariable("idCompany") Long id) {
    Optional<Customer> customer = customerService.getCustomer(id);

    return ResponseEntity.ok(customer);
  }

  @PostMapping(value = "/")
  public ResponseEntity<?> postCompany(@NotNull Customer customer) {
    Customer persistedCustomer = customerService.persist(customer);

    return ResponseEntity.ok(persistedCustomer);
  }

  @PutMapping(value = "/{idCompany}")
  public ResponseEntity<?> putCompany(@NotNull @PathVariable("idCompany") Long id, @NotNull Customer customer) {
    Customer persistedCustomer = customerService.persist(customer);

    return ResponseEntity.ok(persistedCustomer);
  }
}
