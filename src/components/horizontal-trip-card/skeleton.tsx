import React from 'react';
import { View } from 'react-native';
import SkeletonPiece from '../skeleton-piece';
import { s } from './styles';

export default function HorizontalTripCardSkeleton() {
  return (
    <View style={s.cardSkeleton}>
      <View style={s.startSkeleton}>
        <SkeletonPiece width={80} height={24} />
        <View style={{ height: 4 }} />
        <SkeletonPiece width={60} height={14} />
        <View style={{ height: 4 }} />
        <SkeletonPiece width={50} height={12} />
      </View>

      <View style={s.rightSkeleton}>
        <View style={s.passagersSkeleton}>
          <SkeletonPiece width={40} height={14} />
          <SkeletonPiece width={16} height={16} borderRadius={4} />
        </View>
        <SkeletonPiece width={70} height={28} borderRadius={12} />
      </View>
    </View>
  );
}