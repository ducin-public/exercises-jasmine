import API from '../../data/api';

import { Employee, Nationality } from '../../data/data';

describe('async functions', () => {

	// consider examples from promises/api.spec.js file
	// (!) fetch appropriate employees by their IDs: 8569129, 254808831, 58197, 651065

	describe('sequential vs concurrent', () => {
		// define EmployeeListPromise datatype here

		// write an async function which will request data of 4 employees SEQUENTIALLY (when one finished,
		// request another one) and return list of these 4 employees to make `expect` calls pass
		// find appropriate employees in src/data.js file
		async function fetchEmployees__sequential(): EmployeeListPromise {
			// async function body
		}

		it('should perform sequential asynchronous calls', async () => {
			const [e1, e2, e3, e4] = await fetchEmployees__sequential()
			expect(e1.salary).toBe(7191)
			expect(e2.salary).toBe(5941)
			expect(e3.salary).toBe(4157)
			expect(e4.salary).toBe(8146)
		})

		async function fetchEmployees__sequentialForLoop(...ids: number[]): EmployeeListPromise {
			// coroutine body
		}

		it('should perform sequential asynchronous calls using for..of loop', async () => {
			const [e1, e2, e3, e4] = await fetchEmployees__sequentialForLoop(8569129, 254808831, 58197, 651065)
			expect(e1.salary).toBe(7191)
			expect(e2.salary).toBe(5941)
			expect(e3.salary).toBe(4157)
			expect(e4.salary).toBe(8146)
		})

		// write an async function which will request data of 4 employees CONCURRENTLY (all at the same time)
		// and return list of these 4 employees to make `expect` calls pass
		// the data expectations are the same as in previous exercise
		async function fetchEmployees__concurrent(): EmployeeListPromise {
			// async function body
		}

		it('should perform concurrent asynchronous calls', async () => {
			const [e1, e2, e3, e4] = await fetchEmployees__concurrent()
			expect(e1.salary).toBe(7191)
			expect(e2.salary).toBe(5941)
			expect(e3.salary).toBe(4157)
			expect(e4.salary).toBe(8146)
		})

	})

	describe('business domain scenarios', () => {

		// define SalaryPromise datatype here

		// write an async function which will calculate and return total salaries of employees filtered by nationality
		async function getTotalNationalSalary(nationality: Nationality): SalaryPromise {
			// async function body
		}

		for (const {nationality, expected} of [
			{ nationality: "UK", expected: 913138 },
			{ nationality: "US", expected: 1401960 },
			{ nationality: "FR", expected: 411725 },
			{ nationality: "DE", expected: 876208 }
		]) {
			it(`calculates total salaries for certain nationalities (${nationality})`, async () => {
				const totalSalary = await getTotalNationalSalary(nationality);
				expect(totalSalary).toBe(expected);
			});
		}

		// define CountrySalaries datatype here
		// define CountrySalariesPromise datatype here

		// similarly to the previous exercise write an async function which will
		// calculate and return total salaries of employees of all nationalities
		// available in the system
		// the response should be a map: { UK: amount, US: amount, ...}
		async function getTotalSalariesByNationality(): CountrySalariesPromise {
			// async function body
		}

		it('calculates map of total salaries for all nationalities (country code -> total salary)', async () => {
			const salaries = await getTotalSalariesByNationality();
			let { US, UK, DE, FR } = salaries;
			expect(UK).toBe(913138);
			expect(US).toBe(1401960);
			expect(FR).toBe(411725);
			expect(DE).toBe(876208);
		});

		// for a given project (determined by its ID), find the total monthly cost of salaries of all its members
		// project members are the team AND the manager
		// all IDs of the team members are guaranteed to be found in the `employees` dataset
		async function getProjectCost(projectId): Promise<number> {
			// async function body
		}

		for (const { id, expected } of [
			{ id: "1b05249e-1f6a-4bc2-bc1d-136c6adeb686", expected: 65385 },
			{ id: "5d379fe7-52d9-4831-8b66-be54d9aab25c", expected: 105674 },
			{ id: "6eb66b37-1996-4a2a-a110-be6a299bc541", expected: 101438 }
		]) {
			it(`calculates total project costs for project (id:${id})`, async () => {
				const cost = await getProjectCost(id);
				expect(cost).toBe(expected);
			});
		}

		// define OfficeEmployeeSkillset datatype here
		// define OfficeEmployeeSkillsetPromise datatype here

		// calculate advanced statistics: geo-based analysis of employees skillsets within a single country
		// wooh...
		// so for a given country
		// analyse all offices (cities)
		// and within each office calculate the number of FE devs, BE devs and fullstack devs (calculate all 3 numbers)
		// use the following functions: isFrontendDev, isBackendDev, isFullStack
		// (defined in previous exercises)
		async function getOfficeStats(country: string): OfficeEmployeeSkillsetPromise {
			// async function body
		}

		for (const { country, expected } of [
			{ country: 'Poland', expected: {
				"Warszawa": { "frontend": 20, "backend": 31, "fullstack": 13 },
				"Radom": { "frontend": 15, "backend": 22, "fullstack": 8 },
				"Łódź": { "frontend": 86, "backend": 139, "fullstack": 56 },
				"Wrocław": { "frontend": 19, "backend": 34, "fullstack": 16 },
				"Lublin": { "frontend": 43, "backend": 74, "fullstack": 33 },
				"Gdańsk": { "frontend": 24, "backend": 41, "fullstack": 15 }
			}},
			{ country: 'Spain', expected: {
				"Madrid": { "frontend": 19, "backend": 28, "fullstack": 14 },
				"Granada": { "frontend": 7, "backend": 8, "fullstack": 4 }
			}}
		]) {
			it(`calculates office stats for ${country} (map: country -> number of FE, BE, FS devs)`, async () => {
				const stats = await getOfficeStats(country);
				expect(stats).toEqual(expected);
			});
		}

		// define SalaryOfficeMap datatype here
		// define SalaryOfficeMapPromise datatype here

		// calculate average salary of employees
		// but only ones who have a certain skill
		// and out of those emplyees, group them by office
		// in other words...
		// among all employees who know VB.net, the average salary in London is... and in Berlin is... and in Paris is...
		async function getEmployeeCountPerOfficeForSkill(skill: Skill): SalaryOfficeMapPromise {
			// async function body
		}

		for (const { skill, expected } of [
			{ skill: 'JavaScript', expected: { "Torino": 4222.53, "Warszawa": 5539.3, "Frankfurt am Main": 6749.5, "Dallas": 5697.83, "Brest": 5653.18, "Paris": 6642.56, "Plymouth": 5301.5, "Madrid": 5450.68, "London": 5841.38, "Bracknell": 4459.13, "Granada": 4273.86, "Radom": 5236.73, "Reading": 5231, "Rennes": 4888.91, "Den Haag": 5828.91, "Łódź": 5666.08, "Wrocław": 5975.63, "Utrecht": 5507.6, "Lublin": 5429.37, "Gdańsk": 5912.92, "Darmstadt": 5565.16, "Manchester": 5356.38, "Lille": 5323, "Amsterdam": 6687.6, "München": 5093.81, "Milpitas": 4535.19, "San Francisco": 6287.73, "Roma": 5800.43 }},
			{ skill: 'Java', expected: { "Torino": 5355, "Warszawa": 5258.68, "Frankfurt am Main": 6971.17, "Dallas": 5661.83, "Brest": 5264.22, "Paris": 4867.4, "Plymouth": 5213.13, "Madrid": 4892, "London": 6100.83, "Bracknell": 4827.23, "Granada": 5446.4, "Radom": 4961.79, "Reading": 4491.89, "Rennes": 6045.44, "Den Haag": 6329, "Łódź": 5237.08, "Wrocław": 5654.79, "Utrecht": 5653.96, "Lublin": 5568.36, "Gdańsk": 5271.17, "Darmstadt": 5419.81, "Manchester": 7797.18, "Lille": 3930.17, "Amsterdam": 5367, "München": 4847.52, "Milpitas": 4965.3, "San Francisco": 6572.2, "Roma": 6132.25 }},
			{ skill: 'IIS', expected: { "Torino": 4002.33, "Warszawa": 5860.54, "Frankfurt am Main": 5831.38, "Dallas": 5726.5, "Brest": 5895.9, "Paris": 5728.11, "Plymouth": 3989.8, "Madrid": 5763.64, "London": 4834.77, "Bracknell": 5670.59, "Granada": 5708.33, "Radom": 4398.46, "Reading": 3474.5, "Rennes": 4897.88, "Den Haag": 7227.6, "Łódź": 5258.49, "Wrocław": 5989.44, "Utrecht": 6103.84, "Lublin": 5981.11, "Gdańsk": 5619.22, "Darmstadt": 4599, "Manchester": 5660, "Lille": 4315.43, "Amsterdam": 5362.13, "München": 4941.43, "Milpitas": 5654.91, "San Francisco": 5268.2, "Roma": 5192.89 }}
		]) {
			it(`calculates average salary of employees having skill ${skill}, per each office`, async () => {
				const stats = await getEmployeeCountPerOfficeForSkill(skill);
				expect(stats).toEqual(expected);
			});
		}

		// define EmployeesCountryMap datatype here
		// define EmployeesCountryMapPromise datatype here

		// retrieve all employees (objects, not just their numbers) who are not assigned to any project
		// but also split them by country they work in (_not_ by employee nationality)
		async function getUnassignedEmployeesPerCountry(): EmployeesCountryMapPromise {
			// async function body
		}

		it('finds employees unassigned to projects, per country', async () => {
			const stats = await getUnassignedEmployeesPerCountry();
			expect(stats["France"].length).toBe(30);
			expect(stats["Germany"].length).toBe(58);
			expect(stats["Italy"].length).toBe(40);
			expect(stats["Netherlands"].length).toBe(37);
			expect(stats["Poland"].length).toBe(172);
			expect(stats["Spain"].length).toBe(22);
			expect(stats["United Kingdom"].length).toBe(64);
			expect(stats["United States of America"].length).toBe(96);
		});

		// define SkillCountMap datatype here
		// define SkillCountMapPromise datatype here

		// calculate the statistics on how many employees of a given nationality have certail skills
		// that's not as hard as it may sound :)
		// so for employees of a given nationality
		// we're interested only in some skills
		// and... just count them
		async function skillsCountByNationality(nationality: Nationality, chosenSkills: Skill[]): SkillCountMapPromise {
			// async function body
		}

		for (const { nationality, skills, expected } of [
			{ nationality: 'PL', skills: ['Java', '.net', 'JavaScript'], expected: { "Java": 208, ".net": 198, "JavaScript": 207 }},
			{ nationality: 'DE', skills: ['Java', '.net', 'JavaScript'], expected: { "Java": 69, ".net": 83, "JavaScript": 74 }},
			{ nationality: 'FR', skills: ['Java', '.net', 'JavaScript'], expected: { "Java": 29, ".net": 41, "JavaScript": 39 }}
		]) {
			it(`calculates certain skills count of employees by nationality ${nationality}`, async () => {
				const stats = await skillsCountByNationality(nationality, skills);
				expect(stats).toEqual(expected);
			});
		}

		// define EmployeeSkillsetCountryMap datatype here
		// define EmployeeSkillsetCountryMapPromise datatype here

		// a composition of both previous exercises (skill count, employees unassigned to any project)
		// for all employees who are not assigned to any project
		// count how many of them do have certain skills that are interesting to us
		// and group them by the _country_ they work in (_not_ their nationality) 
		async function getUnassignedEmployeesSkillsCountPerCountry(chosenSkills: Skill[]): EmployeeSkillsetCountryMapPromise {
			// async function body
		}
		
		it('calculates certain skills count of employees unassigned to projects, by nationality', async () => {
			const stats = await getUnassignedEmployeesSkillsCountPerCountry(['Java', '.net', 'JavaScript']);
			expect(stats).toEqual({
				"Italy": { "JavaScript": 17, "Java": 19, ".net": 17 },
				"Poland": { "JavaScript": 82, "Java": 80, ".net": 77 },
				"Germany": { "JavaScript": 28, "Java": 24, ".net": 29 },
				"United States of America": { "JavaScript": 40, "Java": 53, ".net": 42 },
				"France": { "JavaScript": 16, "Java": 10, ".net": 17 },
				"United Kingdom": { "JavaScript": 33, "Java": 32, ".net": 25 },
				"Spain": { "JavaScript": 11, "Java": 9, ".net": 11 },
				"Netherlands": { "JavaScript": 19, "Java": 16, ".net": 13 }
			});
		});
	})
})
