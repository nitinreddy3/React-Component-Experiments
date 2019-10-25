const graphData = {
    nodes: [
        {
            "id": 'Nitin',
            "group": 1
        },
        {
            "id": 'JavaScript',
            "group": 2
        },
        {
            "id": 'Databases',
            "group": 2
        },
        {
            "id": 'Devops',
            "group": 2
        },
        {
            "id": 'React',
            "group": 3
        },
        {
            "id": 'Redux',
            "group": 3
        },
        {
            "id": 'Node',
            "group": 3
        },
        {
            "id": 'Meteor',
            "group": 3
        },
        {
            "id": 'Angular',
            "group": 3
        },
        {
            "id": 'MongoDB',
            "group": 4
        },
        {
            "id": 'Couchbase',
            "group": 4
        },
        {
            "id": 'DynamoDB',
            "group": 4
        },
        {
            "id": 'CI/CD',
            "group": 5
        },
        {
            "id": 'AWS',
            "group": 5
        },
        {
            "id": 'Bamboo',
            "group": 5
        }
    ],
    links: [
        {
            "source": 'Nitin',
            "target": 'JavaScript'
        },
        {
            "source": 'Nitin',
            "target": 'Databases'
        },
        {
            "source": 'Nitin',
            "target": 'Devops'
        },
        {
            "source": 'JavaScript',
            "target": 'React'
        },
        {
            "source": 'JavaScript',
            "target": 'Redux'
        },
        {
            "source": 'JavaScript',
            "target": 'Node'
        },
        {
            "source": 'JavaScript',
            "target": 'Meteor'
        },
        {
            "source": 'JavaScript',
            "target": 'Angular'
        },
        {
            "source": 'Databases',
            "target": 'MongoDB'
        },
        {
            "source": 'Databases',
            "target": 'Couchbase'
        },
        {
            "source": 'Databases',
            "target": 'DynamoDB'
        },
        {
            "source": 'Devops',
            "target": 'CI/CD'
        },
        {
            "source": 'Devops',
            "target": 'AWS'
        },
        {
            "source": 'Devops',
            "target": 'Bamboo'
        }
    ]
}

module.exports = {
    graphData,
}