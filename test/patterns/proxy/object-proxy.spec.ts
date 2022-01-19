import API from '../../../data/data';
import { Employee } from "../../../data/types"

class SensitiveDataReportGenerator {
  generate(): object {
    return {
      content: 'report including sensitive data'
    }
  }
}

class AccessVerifier {
  employeeHasAccess(e: Employee){
    return e.salary > 9000 // 🙃
  }
}

// implement the class below according to requirements:
// - SensitiveDataReportGenerator:generate includes important business logic, but not everyone should have access to it...
// - SensitiveDataRestrictedAccess should be a proxy over SensitiveDataReportGenerator which _restricts_ the access :)
// - an applicant (employee) wants to generate the sensitive report
// - underneath, the proxy will use the AccessVerifier:employeeHasAccess to check, whether the user has access to the reports
// - last but not least: a proper proxy should have the same public API as the wrapped object
class SensitiveDataRestrictedAccess {}

describe('SensitiveDataReportGenerator', () => {
  const reportGenerator = new SensitiveDataReportGenerator()
  const verifier = new AccessVerifier()

  it('original object always stays the same', () => {
    expect(reportGenerator.generate()).toEqual({
      content: 'report including sensitive data'
    })
  })

  it('should allow rich employees generate sensitive report', () => {
    const richEmployee = API.getEmployees().find(e => e.salary > 9000)!

    const restrictedAccess = null /* instantiate the proxy here */
    expect(restrictedAccess.generate()).toEqual({
      content: 'report including sensitive data'
    })
  })

  it('should disallow poor employees generate sensitive report', () => {
    const poorEmployee = API.getEmployees().find(e => e.salary < 9000)!
    const restrictedAccess = null /* instantiate the proxy here */
    expect(() => restrictedAccess.generate()).toThrowError('Access Denied!')
  })
})
