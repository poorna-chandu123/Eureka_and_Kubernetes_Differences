package com.eurekakubernetes.accountservice.exception;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.*;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
 @ExceptionHandler(AccountNotFoundException.class)
 public ResponseEntity<Map<String,Object>> notFound(AccountNotFoundException e,HttpServletRequest r){return build(HttpStatus.NOT_FOUND,e.getMessage(),r,null);}
 @ExceptionHandler(CustomerServiceException.class)
 public ResponseEntity<Map<String,Object>> customer(CustomerServiceException e,HttpServletRequest r){return build(HttpStatus.BAD_REQUEST,e.getMessage(),r,null);}
 @ExceptionHandler(MethodArgumentNotValidException.class)
 public ResponseEntity<Map<String,Object>> validation(MethodArgumentNotValidException e,HttpServletRequest r){
  Map<String,String> m=new LinkedHashMap<>(); e.getBindingResult().getFieldErrors().forEach(x->m.put(x.getField(),x.getDefaultMessage()));
  return build(HttpStatus.BAD_REQUEST,"Validation failed",r,m);
 }
 @ExceptionHandler(ConstraintViolationException.class)
 public ResponseEntity<Map<String,Object>> constraint(ConstraintViolationException e,HttpServletRequest r){return build(HttpStatus.BAD_REQUEST,e.getMessage(),r,null);}
 private ResponseEntity<Map<String,Object>> build(HttpStatus s,String msg,HttpServletRequest r,Object d){
  Map<String,Object> b=new LinkedHashMap<>(); b.put("timestamp",LocalDateTime.now());b.put("status",s.value());
  b.put("error",s.getReasonPhrase());b.put("message",msg);b.put("path",r.getRequestURI());if(d!=null)b.put("details",d);
  return ResponseEntity.status(s).body(b);
 }
}
