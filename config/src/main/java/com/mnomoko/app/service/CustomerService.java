package com.mnomoko.app.service;

import com.mnomoko.app.model.Customer;
import com.mnomoko.app.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomerService {

  @Autowired
  private CustomerRepository customerRepository;

  public Page<Customer> getAllCustomers(Pageable pageable) {
    return customerRepository.findAll(pageable);
  }

  public Optional<Customer> getCustomer(Long id) {
    return customerRepository.findById(id);
  }

  public Customer persist(Customer customer) {
    return customerRepository.save(customer);
  }
}
