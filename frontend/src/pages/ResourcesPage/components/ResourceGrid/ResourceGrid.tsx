import React from 'react';
import { Grid } from '../../../../components/ui/Layout';
import ResourceCard from '../ResourceCard/ResourceCard';
import { resourcesData } from '../../data/resourcesData';

const ResourceGrid: React.FC = () => {
  return (
    <Grid
      cols={{ sm: 1, md: 2, lg: 3 }}
      gap="xl"
      alignItems="stretch"
      className="resource-grid"
    >
      {resourcesData.map((resource) => (
        <ResourceCard key={resource.id} resource={resource} />
      ))}
    </Grid>
  );
};

export default ResourceGrid;