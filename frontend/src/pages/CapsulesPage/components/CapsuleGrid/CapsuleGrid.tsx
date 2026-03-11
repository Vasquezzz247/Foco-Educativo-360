import React from 'react';
import { Grid } from '../../../../components/ui/Layout';
import CapsuleCard from '../CapsuleCard/CapsuleCard';
import { capsulesData } from '../../data/capsulesData';

const CapsuleGrid: React.FC = () => {
  return (
    <Grid
      cols={{ sm: 1, md: 2, lg: 3 }} 
      gap="xl"
      alignItems="stretch"
    >
      {capsulesData.map((capsule) => (
        <CapsuleCard key={capsule.id} capsule={capsule} />
      ))}
    </Grid>
  );
};

export default CapsuleGrid;