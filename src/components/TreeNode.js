import React from 'react';
import { FaFolder, FaCodeBranch, FaUsersCog, FaTag, FaPlus, FaMinus } from 'react-icons/fa';
import { GoRepo, GoIssueOpened, GoGitCommit } from 'react-icons/go';
import styled from 'styled-components';
import last from 'lodash/last';
import PropTypes from 'prop-types';
import TreeView from '@material-ui/lab/TreeView';
import StyledTreeItem from './StyledTreeItem';
import { makeStyles } from '@material-ui/core/styles';


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

const getPaddingLeft = (level, type) => {
    let paddingLeft = level * 20;
    if (type === 'file') paddingLeft += 20;
    return paddingLeft;
}

const useStyles = makeStyles(theme => ({
    progress: {
        margin: theme.spacing(2),
    },
}));

const StyledTreeNode = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 8px;
  padding-left: ${props => getPaddingLeft(props.level, props.type)}px;
  &:hover {
    background: lightgray;
  }
  cursor: pointer;
`;

const NodeIcon = styled.div`
  font-size: 12px;
  margin-right: ${props => props.marginRight ? props.marginRight : 5}px;
  cursor: 'pointer';
`;

const getNodeLabel = (path) => last(path.split('/'));

const selectIcon = label =>
    ({
        branches: FaCodeBranch,
        orgs: FaUsersCog,
        folder: FaFolder,
        tags: FaTag,
        issues: GoIssueOpened,
        repos: GoRepo,
        commits: GoGitCommit
    }[label]);

const TreeNode = (props) => {
    const { node, getChildNodes, level, onToggle, isLoading } = props;
    const classes = useStyles();
    return (
        <React.Fragment>
            <StyledTreeItem level={level} type={node.type} nodeId={node.path} labelText={getNodeLabel(node.path)} labelIcon={selectIcon(node.type)} >
                {getChildNodes(node).map((childNode, i) => (
                    <TreeNode
                        {...props}
                        node={childNode}
                        level={level + 1}
                        key={i}
                    />
                ))}
            </StyledTreeItem>
        </React.Fragment>
    );
}

TreeNode.propTypes = {
    node: PropTypes.object.isRequired,
    getChildNodes: PropTypes.func.isRequired,
    level: PropTypes.number.isRequired,
    onToggle: PropTypes.func.isRequired,
    onNodeSelect: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

TreeNode.defaultProps = {
    level: 0,
};

export default TreeNode;