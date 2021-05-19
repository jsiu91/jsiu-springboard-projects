from unittest import TestCase
import unittest
from app import app
from flask import session
from boggle import Boggle


class FlaskTests(TestCase):
    def setUp(self):
        """Runs before every test"""
        self.client = app.test_client()
        app.config['TESTING'] = True

    def test_homepage(self):
        """Checks information in the session and HTML"""
        with self.client:
            res = self.client.get('/')
            self.assertIn('board', session)
            self.assertIsNone(session.get('highscore'))
            self.assertIsNone(session.get('num_plays'))
            self.assertIn(b'<h2>Score:', res.data)
            self.assertIn(b'<h2>Timer:', res.data)
            self.assertIn(b'<h2>Words:', res.data)
    
    def test_valid_word(self):
        """Test if the guessed word exists in the board"""
        with self.client as client:
            with client.session_transaction() as sess:
                sess['board'] =[["C", "A", "T", "T", "T"], 
                                 ["C", "A", "T", "T", "T"], 
                                 ["C", "A", "T", "T", "T"], 
                                 ["C", "A", "T", "T", "T"], 
                                 ["C", "A", "T", "T", "T"]]
        res = self.client.get('/guess-word?guess=cat')
        self.assertEqual(res.json['result'], 'ok')

    def test_invalid_word(self):
        """Test if the guessed word is not on board"""
        self.client.get('/')
        res = self.client.get('/guess-word?guess=impossible')
        self.assertEqual(res.json['result'], 'not-on-board')

    def non_english_word(self):
        """Test if the guessed word is not a real word"""
        self.client.get('/')
        res = self.client.get('/guess-word?guess=sdfoijsdoifjfsdf')
        self.assertEqual(res.json['result'], 'not-word')

if __name__=='__main__':
    unittest.main()