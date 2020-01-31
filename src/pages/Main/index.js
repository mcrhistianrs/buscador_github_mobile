import React, { Component }                                 from 'react';
import {Keyboard , ActivityIndicator}                       from 'react-native';
import Icon                                                 from 'react-native-vector-icons/MaterialIcons';
import api                                                  from '../../services/api';
import { Container,
   Form ,
   Input ,
   SubmitButtom,
   List,
   User,
   Avatar,
   Name,
   Bio,
   ProfileButtom,
   ProfileButtomText }      from './styles';
import { Picker } from 'react-native';

export default class  Main extends Component {

  state = {
    newUser: '',
    users:[],
    loading:false
  }

  handleAddUser = async () => {
    const { users, newUser} = this.state;
    this.setState({loading:true});
    
    const response = await api.get(`/users/${newUser}`);
    const data = {
      name    : response.data.name,
      login   : response.data.login,
      bio     : response.data.bio,
      avatar  : response.data.avatar_url,
    };

    this.setState({
      users       :  [...users, data],
      newUser     : '',
      loading     : false 
    });

    Keyboard.dismiss();
  }

  render(){
    const { users,newUser,loading} = this.state;
    console.tron.log(users);
      return (
        <Container>
          <Form>
            <Input 
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Adicionar Usuário"
              onChangeText={text => this.setState({newUser: text})}
              returnKeyType="send"
              onSubmitEditing={this.handleAddUser}
            />
            <SubmitButtom loading={loading} onPress={this.handleAddUser}>
              {loading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Icon name="add" size={20} color="#FFF" />
              )
            }
              
          </SubmitButtom>
          </Form>


         <List 
            data={users}
            keyExtractor={user => user.login }
            renderItem={ ({item}) =>(
              <User>
                <Avatar source={ {uri:item.avatar} } />
                <Name>{item.name}</Name>
                <Bio>{item.bio}</Bio>
                <ProfileButtom onPress={ () => {}}>
                  <ProfileButtomText>Ver Perfil</ProfileButtomText>
                </ProfileButtom>
              </User>
            )}
         />
        </Container>
      );
  }
}

Main.navigationOptions = {
  title: 'Usuários',
}
