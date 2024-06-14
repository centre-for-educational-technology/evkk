import React, { useEffect, useState } from 'react';
import { cloneDeep } from 'lodash';
import CheckboxHelper from './CheckboxHelper';
import './../ErrorAnalyser.css';

//https://medium.com/sltc-sean-learns-to-code/how-i-build-a-nested-checkbox-react-component-7eef982d1ea9
//https://playcode.io/1193701E

const transform = (data) => {
  return data.map((item) => {
    const parentNode = {
      label: item.label,
      type: item.type,
      checked: false,
      childrenNodes: [],
      parent: null,
    };

    parentNode.childrenNodes = item.subtype
      ? item.subtype.map((child) => ({
        label: child.label,
        type: child.type,
        checked: false,
        childrenNodes: [],
        parent: parentNode,
      }))
      : [];

    return parentNode;
  });
};

const updateAncestors = (node) => {
  if (!node.parent) {
    return;
  }

  const parent = node.parent;
  if (parent.checked && !node.checked) {
    parent.checked = false;
    updateAncestors(parent);
    return;
  }

  if (!parent.checked && node.checked) {
    if (parent.childrenNodes.every((node) => node.checked)) {
      parent.checked = true;
      updateAncestors(parent);
      return;
    }
  }

  return;
};

const toggleDescendants = (node) => {
  const checked = node.checked;

  node.childrenNodes.forEach((node) => {
    node.checked = checked;
    toggleDescendants(node);
  });
};

const findNode = (nodes, type, ancestors) => {
  let node = undefined;
  if (ancestors.length === 0) {
    return nodes.filter((node) => node.type === type)[0];
  }

  for (let ancestor of ancestors) {
    const candidates = node ? node.childrenNodes : nodes;
    node = candidates.filter((node) => node.type === ancestor)[0];
  }
  return node?.childrenNodes.filter((node) => node.type === type)[0];
};

export default function ErrorCheckbox({
                                        data,
                                        setSelectedItems,
                                        setRequestFilterErrors,
                                      }) {
  const initialNodes = transform(data);
  const [nodes, setNodes] = useState(initialNodes);

  const handleBoxChecked = (e, ancestors) => {
    const checked = e.currentTarget.checked;
    const node = findNode(nodes, e.currentTarget.value, ancestors);
    node.checked = checked;
    toggleDescendants(node);
    updateAncestors(node);

    setNodes(cloneDeep(nodes));
    setRequestFilterErrors({
      typeError: false,
      levelError: false,
    });
  };

  useEffect(() => {
    setSelectedItems(nodes);
  }, [nodes, setSelectedItems]);

  return (
    <CheckboxHelper
      nodes={nodes}
      ancestors={[]}
      onBoxChecked={handleBoxChecked}
    />
  );
}
