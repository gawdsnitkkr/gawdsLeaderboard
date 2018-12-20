// Single octokit object to be used across files
// This is required to be able to use the octokit api without repeated authentication
const octokit = require('@octokit/rest')();

module.exports = octokit;