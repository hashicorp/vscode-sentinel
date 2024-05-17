"use strict";
exports.__esModule = true;
exports.files = exports.structure = void 0;
exports.structure = [
    '.github',
    '.github/workflows',
    'docs',
    'docs/policies',
    'policies',
    'policies/test',
    'policies/test/policy-001',
    'policies/test/policy-001/mocks',
    'policies/test/policy-001/mocks/policy-success',
    'policies/test/policy-001/mocks/policy-failure',
];
exports.files = [
    [".github/workflows/sentinel.yml", ""],
    ["docs/policies/policies-001.md", ""],
    ["policies/policy-001.sentinel", ""],
    ["policies/test/policy-001/success.hcl", ""],
    ["policies/test/policy-001/failure.hcl", ""],
    ["policies/test/policy-001/mocks/policy-success/mock-tfplan-v2.sentinel"],
    ["policies/test/policy-001/mocks/policy-success/mock-tfstate-v2.sentinel"],
    ["policies/test/policy-001/mocks/policy-success/mock-tfconfig-v2.sentinel"],
    ["policies/test/policy-001/mocks/policy-failure/mock-tfplan-v2.sentinel"],
    ["policies/test/policy-001/mocks/policy-failure/mock-tfstate-v2.sentinel"],
    ["policies/test/policy-001/mocks/policy-failure/mock-tfconfig-v2.sentinel"],
    [".gitignore", ""],
    ["sentinel.hcl", ""],
    ["README.md", ""],
    ["Makefile", ""],
];
