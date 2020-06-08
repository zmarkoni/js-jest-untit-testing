//https://www.udemy.com/course/javascript-the-complete-guide-2020-beginner-advanced/learn/lecture/16677260#overview
const get = (url) => {
	return Promise.resolve({
		data: {
			title: 'delectus aut autem',
		},
	});
};

exports.get = get;
