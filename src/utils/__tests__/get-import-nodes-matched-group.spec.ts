import { getImportNodes } from '../get-import-nodes';
import { getMatchedGroup } from '../get-import-nodes-matched-group';

const code = `// first comment
// second comment
import z from '@server/z';
import c from '@server/c';
import g from '@ui/g';
import t from '@core/t';
import k from 'k';
import j from './j';
import l from './l';
import a from '@core/a';
`;
test('should return correct matched groups', () => {
    const importNodes = getImportNodes(code);
    const importOrder = ['^@server/(.*)$', '^@core/(.*)$', '^@ui/(.*)$', '^[./]'];

    let matchedGroups: string[] = [];
    for (const importNode of importNodes) {
        const matchedGroup = getMatchedGroup(importNode, importOrder);
        matchedGroups.push(matchedGroup);
    }
    expect(matchedGroups).toEqual([
        '^@server/(.*)$',
        '^@server/(.*)$',
        '^@ui/(.*)$',
        '^@core/(.*)$',
        '<THIRD_PARTY_MODULES>',
        '^[./]',
        '^[./]',
        '^@core/(.*)$',
    ]);
});

test('should return THIRD_PARTY_MODULES as matched group with empty order list', () => {
    const importNodes = getImportNodes(code);
    const importOrder: string[] = [];

    for (const importNode of importNodes) {
        const matchedGroup = getMatchedGroup(importNode, importOrder);
        expect(matchedGroup).toEqual('<THIRD_PARTY_MODULES>');
    }
});
