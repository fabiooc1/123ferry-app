import React from 'react';
import { View } from 'react-native';
import SkeletonPiece from '../skeleton-piece';
import { s } from './styles';

export default function VerticalTripCardSkeleton() {
  return (
    <View style={s.cardSkeleton}>
      
      <View style={s.lineSkeleton}>
        <SkeletonPiece width="70%" height={24} />
        <View style={{ height: 4 }} />
        <SkeletonPiece width="40%" height={14} />
      </View>

      <View style={s.lineSkeleton}>
        <SkeletonPiece width="85%" height={12} />
      </View>

      <View style={s.lineSkeleton}>
        <SkeletonPiece width="50%" height={14} />
      </View>

    </View>
  );
}