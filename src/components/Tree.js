import React, { useState } from 'react';
import values from 'lodash/values';
import PropTypes from 'prop-types';
import { each, get, last } from 'lodash';
import TreeNode from './TreeNode';
import useScroll from './useScroll';
import Snackbar from '@material-ui/core/Snackbar';
import MySnackbarContentWrapper from './MySnackbarContentWrapper';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

import TreeView from '@material-ui/lab/TreeView';
import Typography from '@material-ui/core/Typography';
import MailIcon from '@material-ui/icons/Mail';
import DeleteIcon from '@material-ui/icons/Delete';
import Label from '@material-ui/icons/Label';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import InfoIcon from '@material-ui/icons/Info';
import ForumIcon from '@material-ui/icons/Forum';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const useStyles2 = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
    paper: {
        position: 'relative',
        height: '80vh',
        minHeight: '100',
        overflowY: 'auto',
        padding: 10
    }
}));

const Tree = (props) => {

    const classes = useStyles2();

    const { selectedProfile, nodes, setNodes } = props;
    const [isLoading, setIsLoading] = useState(false);
    useScroll(isLoading);

    const getResponse = async (node) => {
        await setIsLoading(true);
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
            await setNodes(formatData(apiResponse, node, apiUrl));
            await setIsLoading(false);
        } catch (err) {
            console.log('Error: ', err);
            await setIsLoading(false);
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

    const onToggle = async (nodeId) => {
        let node = nodes[nodeId];
        nodes[node.path].isOpen = !node.isOpen;
        await setNodes({ ...nodes, open: !node.isOpen });
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
        <Paper className={classes.paper}>
            {
                isLoading &&
                <MySnackbarContentWrapper
                    variant="info"
                    className={classes.margin}
                    message="Loading..."
                />}
            {rootNodes.length ? rootNodes.map((node, i) => (
                <TreeView
                    defaultCollapseIcon={<ArrowDropDownIcon />}
                    defaultExpandIcon={<ArrowRightIcon />}
                    defaultEndIcon={<div style={{ width: 24 }} />}
                    onNodeToggle={
                        (nodeId, expanded) => {
                            onToggle(nodeId)
                        }
                    }
                >
                    <TreeNode
                        node={node}
                        getChildNodes={getChildNodes}
                        onToggle={onToggle}
                        onNodeSelect={onNodeSelect}
                        isLoading={isLoading}
                        key={i}
                    />
                </TreeView>
            )) : <p>No profile is selected</p>}
        </Paper>
    )
};

Tree.propTypes = {
    onSelect: PropTypes.func,
};

Tree.defaultProps = {
    onSelect: () => { },
};

export default Tree;