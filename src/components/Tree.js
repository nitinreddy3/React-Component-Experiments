import React, { useState } from 'react';
import values from 'lodash/values';
import PropTypes from 'prop-types';
import { each, get, last } from 'lodash';
import TreeNode from './TreeNode';

const Tree = (props) => {

    const { selectedProfile, nodes, setNodes } = props;
    const [isLoading, setIsLoading] = useState(false);

    const getResponse = async (node) => {
        setIsLoading(true);
        try {
            const { apiUrl } = node;
            const { username, password } = selectedProfile;
            const base64Conversion = btoa(`${username}:${password}`);
            const response = await fetch(apiUrl, {
                method: 'get',
                headers: {
                    'Authorization': `Basic ${base64Conversion}`
                }
            })

            const apiResponse = await response.json();
            setNodes(formatData(apiResponse, node, apiUrl));
            setIsLoading(false);
        } catch (err) {
            console.log('Error: ', err);
            setIsLoading(false);
        }
    };

    const formatData = (apiResponse, currentNode, apiUrl) => {
        each(apiResponse, response => {
            if (response.login) {
                nodes[`${currentNode.path}/${response.login}`] = {
                    path: `${currentNode.path}/${response.login}`,
                    type: last(apiUrl.split('/')) || 'folder',
                    children: [],
                    apiUrl: response.repos_url
                };
                nodes[currentNode.path].children = [...nodes[currentNode.path].children, `${currentNode.path}/${response.login}`]
            } else if (response.name) {
                nodes[`${currentNode.path}/${response.name}`] = {
                    path: `${currentNode.path}/${response.name}`,
                    type: last(apiUrl.split('/')),
                    children: [],
                    branchesUrl: `${response.url}/branches`,
                    tagsUrl: `${response.url}/tags`,
                    issuesUrl: `${response.url}/issues`,
                    commitsUrl: `${response.url}/commits`,
                };
                nodes[currentNode.path].children = [...nodes[currentNode.path].children, `${currentNode.path}/${response.name}`]
            } else if (response.number) {
                nodes[`${currentNode.path}/${response.number}`] = {
                    path: `${currentNode.path}/${response.number}`,
                    type: last(apiUrl.split('/')),
                    children: [],
                };
                nodes[currentNode.path].children = [...nodes[currentNode.path].children, `${currentNode.path}/${response.number}`]
            } else if (response.sha) {
                nodes[`${currentNode.path}/${response.sha}`] = {
                    path: `${currentNode.path}/${response.sha}`,
                    type: last(apiUrl.split('/')),
                    children: [],
                };
                nodes[currentNode.path].children = [...nodes[currentNode.path].children, `${currentNode.path}/${response.sha}`]
            }
        });
        return nodes;
    };

    const getRootNodes = () => {
        return values(nodes).filter(node => node.isRoot === true);
    }

    const getChildNodes = (node) => {
        if (!node.children) return [];
        return node.children.map(path => nodes[path]);
    }

    const onToggle = async (node) => {
        nodes[node.path].isOpen = !node.isOpen;
        setNodes({ ...nodes, open: !node.isOpen });
        if (node.apiUrl && !get(node, 'children.length')) {
            await getResponse(node);
        } else if (!get(node, 'children.length')) {
            await getResponse({ ...node, apiUrl: node.branchesUrl })
            await getResponse({ ...node, apiUrl: node.tagsUrl })
            await getResponse({ ...node, apiUrl: node.issuesUrl })
            await getResponse({ ...node, apiUrl: node.commitsUrl })
        }
    }

    const onNodeSelect = node => {
        const { onSelect } = props;
        onSelect(node);
    }

    const rootNodes = getRootNodes();
    return (
        <div>
            {rootNodes.length ? rootNodes.map((node, i) => (
                <TreeNode
                    node={node}
                    getChildNodes={getChildNodes}
                    onToggle={onToggle}
                    onNodeSelect={onNodeSelect}
                    isLoading={isLoading}
                    key={i}
                />
            )) : <p>No profile is selected</p>}
        </div>
    )
};

Tree.propTypes = {
    onSelect: PropTypes.func,
};

Tree.defaultProps = {
    onSelect: () => { },
};

export default Tree;