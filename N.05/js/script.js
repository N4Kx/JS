var array = [5, 7,
	[4, [2], 8, [1, 3], 2],
	[9, []],
	1, 8
]

function treeSum(arr) {
	return arr.reduce((prev, cur) => prev + (Array.isArray(cur) ? treeSum(cur) : cur), 0);
}
console.log(treeSum(array));