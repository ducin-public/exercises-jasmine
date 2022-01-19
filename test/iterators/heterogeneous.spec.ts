import db from '../../data/data';
import { Account, Employee, Money, Nationality } from '../../data/data';

describe('Heterogeneous Collections Iterators', () => {

  // in this exercise we will be dealing with two different data structures
  // you'll find them in:
	// - db/employees.json
	// - db/accounts.json
  // both produce collections of employees

  // the task is to create generators which will iterate over these collections
  // AS IF IT WAS ONE COLLECTION (abstracting away the difference)

  it('iterates over heterogeneous data structures and returns one item per step', () => {
    // the first task is to create a generator that will simply iterate
    // over one collection and then over the second one and terminate
    // no structure changes (this we'll do later)
    // first we need to create a datatype for the iterator - note that
    // it will iterate over DIFFERENT data structures

    // define HeterogeneousIterator datatype here

    // and now implement the generator itself - it will iterate over employees first and then on accounts

    // define iterateCollections generator here

    let iterator: HeterogeneousIterator;
    iterator = iterateCollections(db.getEmployees(), db.getAccounts());
    let dumped = [...iterator];
    expect(dumped.length).toEqual(1323);
		expect(dumped[0].id).toEqual(91720);
		expect(dumped[0].firstName).toEqual("Bertram");
		expect(dumped[0].lastName).toEqual("Kruszewski");
		expect(dumped[110].id).toEqual(40548);
		expect(dumped[110].nationality).toEqual("UK");
		expect(dumped[110].firstName).toEqual("Noble");
		expect(dumped[110].lastName).toEqual("Bernhard");
		expect(dumped[1319].id).toEqual("2839573a-29d2-4d3f-8f3f-05047d9a0445");
		expect(dumped[1319].name).toEqual("Jerrod Beer");
		expect(dumped[1319].country).toEqual("France");
		expect(dumped[1319].phones[0]).toEqual("751.960.4754 x707");
		expect(dumped[1322].id).toEqual("441ba1ea-9ca7-4438-a94c-4c0a0646efc2");
		expect(dumped[1322].name).toEqual("Howell Little");
		expect(dumped[1322].country).toEqual("France");
		expect(dumped[1322].phones.length).toEqual(0);
  })

  it('iterates over heterogeneous data structures and returns one item per step', () => {
    interface UnifiedEmployee {
      id: string | number;
      fullName: string;
      contactPhone: string;
      countryCode: Nationality;
      salary: Money;
    }

    // the second step is to improve above generator and map all items into the unified data structure
    // the UnifiedEmployee datatype is provided above
    // We need an iterator datatype or UnifiedEmployee

    // define UnifiedIterator datatype here

    // mapping original employee objects to unified employees
    // (as well as mapping accounts to unified employees)
    // will require to write some mapping functions
    // write them here

    // finally, implement the new generator itself:
    // it will iterate over employees first and then on accounts, just as the old one did
    // but twis time it will map the items to the unified structure
    // SO THAT THE CONSUMER OF THIS GENERATOR DOESN'T NECESSARILY KNOW THAT DATA SOURCES WERE DIFFERENT
    // EXAMPLE: [{attr:1}] + [{at: 7}] -> [{attribute:1}, {attribute:7}]

    // define iterateAndUnifyCollections generator here

    let iterator: UnifiedIterator;
    iterator = iterateAndUnifyCollections(db.getEmployees(), db.getAccounts());
    let dumped = [...iterator];
    expect(dumped.length).toEqual(1323);
		expect(dumped[0].id).toEqual(91720);
		expect(dumped[0].fullName).toEqual("Bertram Kruszewski");
		expect(dumped[110].id).toEqual(40548);
		expect(dumped[110].countryCode).toEqual("UK");
		expect(dumped[110].fullName).toEqual("Noble Bernhard");
		expect(dumped[1319].id).toEqual("2839573a-29d2-4d3f-8f3f-05047d9a0445");
		expect(dumped[1319].fullName).toEqual("Jerrod Beer");
		expect(dumped[1319].countryCode).toEqual("FR");
		expect(dumped[1319].contactPhone).toEqual("751.960.4754 x707");
		expect(dumped[1322].id).toEqual("441ba1ea-9ca7-4438-a94c-4c0a0646efc2");
		expect(dumped[1322].fullName).toEqual("Howell Little");
		expect(dumped[1322].countryCode).toEqual("FR");
		expect(dumped[1322].contactPhone).toEqual(null);
  })

})
