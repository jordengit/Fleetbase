import type { NodePath } from '@babel/traverse';
export default function error(path: NodePath, message: string): Error;
