import React, { Component } from 'react';
import values from 'lodash/values';
import PropTypes from 'prop-types';
import { each, get, last } from 'lodash';
import TreeNode from './TreeNode';

const data = {
    '/Github@InterCAX': {
        path: '/Github@InterCAX',
        type: 'folder',
        isRoot: true,
        children: [],
        apiUrl: 'https://api.github.com/user/orgs'
    },

    // '/root/david': {
    //     path: '/root/david',
    //     type: 'folder',
    //     children: ['/root/david/readme.md'],
    // },
    // '/root/david/readme.md': {
    //     path: '/root/david/readme.md',
    //     type: 'file',
    //     content: 'Thanks for reading me me. But there is nothing here.'
    // },
    // '/root/jslancer': {
    //     path: '/root/jslancer',
    //     type: 'folder',
    //     children: ['/root/jslancer/projects', '/root/jslancer/vblogs'],
    // },
    // '/root/jslancer/projects': {
    //     path: '/root/jslancer/projects',
    //     type: 'folder',
    //     children: ['/root/jslancer/projects/treeview'],
    // },
    // '/root/jslancer/projects/treeview': {
    //     path: '/root/jslancer/projects/treeview',
    //     type: 'folder',
    //     children: [],
    // },
    // '/root/jslancer/vblogs': {
    //     path: '/root/jslancer/vblogs',
    //     type: 'folder',
    //     children: [],
    // },
};

export default class Tree extends Component {

    state = {
        nodes: data,
        isLoading: false,
    };

    getResponse = async (node) => {
        await this.setState({ isLoading: true });
        try {
            const { apiUrl } = node;
            const response = await fetch(apiUrl, {
                method: 'get',
                headers: {
                    'Authorization': `Basic ${btoa('nitinreddy3:nitingh3')}`
                }
            })

            const apiResponse = await response.json();
            console.log('Response: ', apiResponse);
            await this.setState({ nodes: this.formatData(apiResponse, node, apiUrl) })
            await this.setState({ isLoading: false });
        } catch (err) {
            console.log('Error: ', err);
            await this.setState({ isLoading: false });
        }
    }

    formatData = (apiResponse, currentNode, apiUrl) => {
        let { nodes } = this.state;
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
    }

    getRootNodes = () => {
        const { nodes } = this.state;
        return values(nodes).filter(node => node.isRoot === true);
    }

    getChildNodes = (node) => {
        const { nodes } = this.state;
        if (!node.children) return [];
        return node.children.map(path => nodes[path]);
    }

    onToggle = (node) => {
        const { nodes } = this.state;
        // console.log(node);
        nodes[node.path].isOpen = !node.isOpen;
        if (node.apiUrl && !get(node, 'children.length')) {
            this.getResponse(node);
        } else if (!get(node, 'children.length')) {
            this.getResponse({ ...node, apiUrl: node.branchesUrl })
            this.getResponse({ ...node, apiUrl: node.tagsUrl })
            this.getResponse({ ...node, apiUrl: node.issuesUrl })
            this.getResponse({ ...node, apiUrl: node.commitsUrl })
        }
        this.setState({ nodes });
    }

    onNodeSelect = node => {
        const { onSelect } = this.props;
        onSelect(node);
    }

    render() {
        const rootNodes = this.getRootNodes();
        const { isLoading } = this.state;
        return (
            <div>
                {rootNodes.map((node, i) => (
                    <TreeNode
                        node={node}
                        getChildNodes={this.getChildNodes}
                        onToggle={this.onToggle}
                        onNodeSelect={this.onNodeSelect}
                        isLoading={isLoading}
                        key={i}
                    />
                ))}
            </div>
        )
    }
}

Tree.propTypes = {
    onSelect: PropTypes.func.isRequired,
};