import API, { Employee } from '../../../data/data';
import { hasSalary } from "../composite/composite";

// the CompositeSalary needs to implement following interface:
// {
//   snapshot(): Memento
// }

const employeeSalaryFactory = (employee: Employee): hasSalary => {
  // use your composite implementation
}

describe('Memento', () => {
  it('should restore previous state of an object', () => {
    // you can either extend CompositeSalary with memento implementation or create a separate class with a different name
    // adapt the following line (with constructor) to your implementation:
    const composite: CompositeSalaryWithMemento = new CompositeSalaryWithMemento()

    const e447819 = API.getEmployeeById(447819)
    composite.include(employeeSalaryFactory(e447819))
    expect(composite.getTotalSalary()).toEqual(5064)

    // MAKE SNAPSHOT 1
    const snapshot1 = composite.snapshot()

    const e46767 = API.getEmployeeById(46767)
    composite.include(employeeSalaryFactory(e46767))
    const e219895 = API.getEmployeeById(219895)
    composite.include(employeeSalaryFactory(e219895))
    expect(composite.getTotalSalary()).toEqual(14769)

    // MAKE SNAPSHOT 2
    const snapshot2 = composite.snapshot()

    // RESTORE SNAPSHOT 1
    snapshot1.restore()
    expect(composite.getTotalSalary()).toEqual(5064)

    // RESTORE SNAPSHOT 2
    snapshot2.restore()
    expect(composite.getTotalSalary()).toEqual(14769)
  });
})
