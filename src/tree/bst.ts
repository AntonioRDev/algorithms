// Binary Search Tree

class TreeNode<T> {
  data: T;
  leftChild?: TreeNode<T>;
  rightChild?: TreeNode<T>;
  parentSide?: 'leftChild' | 'rightChild';

  constructor(data: T) {
    this.data = data;
  }
}

class BinarySearchTree {
  root?: TreeNode<number>;
  size: number;

  constructor() {
    this.root = undefined;
    this.size = 0;
  }

  insert(data: number) {
    const newNode = new TreeNode(data);
    
    if(this.root) {
      const { found, parent } = this.findNodeAndParent(data);

      if(found) {
        // duplicated
        return found;
      } else if (data < parent!.data) {
        newNode.parentSide = 'leftChild';
        parent!.leftChild = newNode;
      } else {
        newNode.parentSide = "rightChild";
        parent!.rightChild = newNode;
      }
    } else {
      this.root = newNode;
    }

    this.size += 1;
    return newNode;
  }

  find(data: number) {
    return this.findNodeAndParent(data).found;
  }

  private findNodeAndParent(data: number) {
    let currentNode = this.root;
    let parent = this.root;

    while(currentNode) {
      if (currentNode.data === data) {
        break;
      }
      parent = currentNode;
      currentNode = (data >= parent.data) ? parent.rightChild : parent.leftChild
    }

    return { found: currentNode, parent };
  }

  private isLeaf(node: TreeNode<number>): boolean {
    return !node.leftChild && !node.rightChild;
  }

  private getLeftmost(node: TreeNode<number>): TreeNode<number> {
    if(!node || !node.leftChild) {
      return node;
    }

    return this.getLeftmost(node.leftChild);
  }

  private combineLeftIntoRightSubtree(node: TreeNode<number>) {
    if (node.rightChild) {
      const leftmost = this.getLeftmost(node.rightChild);
      leftmost.leftChild = node.leftChild;
      node.rightChild.parentSide = node.parentSide;

      return node.rightChild;
    }

    return node.leftChild;
  }

  remove(value: number) { 
    const { found: nodeToRemove, parent: nodeToRemoveParent } = this.findNodeAndParent(value);
    const isRoot = nodeToRemove === this.root;

    if(!nodeToRemove) return false;

    if(this.isLeaf(nodeToRemove)) {
      if(isRoot) {
        this.root = undefined;
        return true;
      }

      nodeToRemoveParent![nodeToRemove.parentSide!] = undefined;
      return true;
    }

    const resultChildrenSubtree = this.combineLeftIntoRightSubtree(nodeToRemove);

    if(nodeToRemove === this.root) {
      this.root = resultChildrenSubtree;
    } else {
      nodeToRemoveParent![nodeToRemove.parentSide!] = resultChildrenSubtree;
    } 

    this.size -= -1;
    return true;
  }

  // getMax() { /* ... */ }
  // getMin() { /* ... */ }
}

///
const bst = new BinarySearchTree();
bst.insert(30);
bst.insert(15);
bst.insert(60);
bst.insert(45);
bst.insert(75);
bst.insert(7);
bst.insert(22);
bst.insert(17);
bst.insert(27);

bst.remove(15);

console.log(bst);