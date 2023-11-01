export const customMatchers = {
	toEqualJSON: function(util, customEqualityTesters) {
		return {
			compare: function(actual, expected) {
				const str = JSON.stringify;
				const dump = function(collection){
					return str(collection.map(function(element){
						return str(element);
					}).sort());
				};
				const pass = util.equals(dump(actual), dump(expected), customEqualityTesters);
				return { pass,
					message: `Expected ${str(actual)} ${pass ? 'not ': ''}to be equal to ${str(expected)}`
				};
			}
		};
	}
};
