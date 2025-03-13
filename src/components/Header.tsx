import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'

import { Ionicons } from '@expo/vector-icons'

const Header = () => {
  return (
    <View className='p-4 top-0 w-full z-10'>
      <View className='flex-row justify-between items-center'>
      <Text className='text-xl font-bold dark:text-white'>
        Sonic Studio
      </Text>
      <TouchableOpacity
        className='p-2 rounded-full dark:bg-gray-800'
        onPress={() => console.log('Settings Clicked')}
      >
        <Ionicons name="settings" size={24} color="black" className="p-2 dark:text-white"/>
      </TouchableOpacity>
      </View>
    </View>
  )
}

export default Header