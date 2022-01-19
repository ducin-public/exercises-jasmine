import { Employee } from "../../../data/types";

const getTotalSalary = (employees: Employee[]) =>
  employees.reduce((sum, e) => sum + e.salary, 0)

// use native-JS Proxy, which will wrap access to native properties:
// - TS-wise, the Proxy type-casts the object to a given type: `asProxy<Employee>(obj)`
// - if the code tries to access an existent property, let it go
// - if the code tries to access an NON-existent property, throw an error

// implement the function below:
const asProxy = (t) => t

describe('asProxy', () => {
  it('should allow to access existing `salary` fields', () => {
    const mockEmployees = [{
      salary: 100
    }, {
      salary: 200
    }].map(obj => asProxy<Employee>(obj))
  
    const result = getTotalSalary(mockEmployees);
    expect(result).toEqual(300);
  });

  it('should allow to access existing `nationality` fields', () => {
    const mockEmployees = [{
      nationality: 'PL',
      salary: 100
    }, {
      nationality: 'US',
      salary: 200
    }].map(obj => asProxy<Employee>(obj))
  
    const result = getTotalSalary(mockEmployees.filter(e => e.nationality == 'PL'))
    expect(result).toEqual(100);
  });

  it('should throw if trying to access non-existing field', () => {
    const mockEmployees = [{
      salary: 100
    }, {
      salary: 200
    }].map(obj => asProxy<Employee>(obj))

    expect(() => getTotalSalary(mockEmployees.filter(e => e.nationality == 'PL'))).toThrowError()
  });
})
  